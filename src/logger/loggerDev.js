import winston from "winston";
import { format } from "winston";
import { format as dateFnsFormat, parseISO } from "date-fns";

const { combine, label, printf, timestamp, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const timestampAsDate = parseISO(timestamp);

  const localTimestamp = dateFnsFormat(
    timestampAsDate,
    "yyyy-MM-dd HH:mm:ssXXX",
    {
      timeZone: "America/Argentina/Buenos_Aires",
    }
  );

  return `${localTimestamp} [${label}] ${level}: ${message}`;
});

const consoleTransport = new winston.transports.Console({
  level: "info",
  format: combine(
    label({ label: "API CODER" }),
    timestamp(),
    colorize(),
    myFormat
  ),
});

const fileCombinedTransport = new winston.transports.File({
  filename: "logs/error.log",
  level: "error",
  format: format.combine(label({ label: "API CODER" }), timestamp(), myFormat),
});

const fileErrorTransport = new winston.transports.File({
  filename: "logs/combined.log",
  level: "info",
  format: format.combine(label({ label: "API CODER" }), timestamp(), myFormat),
});

export const loggerDev = () => {
  return winston.createLogger({
    transports: [consoleTransport, fileCombinedTransport, fileErrorTransport],
  });
};
