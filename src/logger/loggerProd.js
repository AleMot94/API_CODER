import winston from "winston";
import { format } from "winston";
import { format as dateFnsFormat, parseISO } from "date-fns";

const { combine, printf, timestamp } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  const timestampAsDate = parseISO(timestamp);

  const localTimestamp = dateFnsFormat(
    timestampAsDate,
    "yyyy-MM-dd HH:mm:ssXXX",
    {
      timeZone: "America/Argentina/Buenos_Aires",
    }
  );

  return `${localTimestamp} ${level}: ${message}`;
});

const consoleTransport = new winston.transports.Console({
  level: "info",
  format: combine(timestamp(), myFormat),
});

const fileCombinedTransport = new winston.transports.File({
  filename: "logs/errorProd.log",
  level: "error",
  format: format.combine(timestamp(), myFormat),
});

const fileErrorTransport = new winston.transports.File({
  filename: "logs/combinedProd.log",
  level: "info",
  format: format.combine(timestamp(), myFormat),
});

export const loggerProd = () => {
  return winston.createLogger({
    transports: [consoleTransport, fileCombinedTransport, fileErrorTransport],
  });
};
