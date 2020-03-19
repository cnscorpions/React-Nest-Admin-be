// token
const PRIVATE_KEY = "a_token_for_develop";
const JWT_EXPIRED = 60 * 60 * 24; // 1 day

// ebook
const UPLOAD_DIR = process.env.NODE_ENV === "production" ? "/home/gavin/react-nest-admin/upload" : "upload/";
// const MIME_TYPE_EPUB = "application/epub+zip";

export { PRIVATE_KEY, JWT_EXPIRED, UPLOAD_DIR };
