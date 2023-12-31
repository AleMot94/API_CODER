import multer from "multer";
import { __dirname } from "../utils/dirname.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "../../public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });
