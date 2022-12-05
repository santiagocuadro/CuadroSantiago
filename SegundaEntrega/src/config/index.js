import dotenv from 'dotenv';
dotenv.config();

const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";

const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    SELECTED_DATABASE: process.env.SELECTED_DB ?? "memory",
  },
  DATABASES: {
    filesystem: {
      PRODUCTS_FILENAME,
      CARTS_FILENAME,
    },
    mongo: {
      url: process.env.MONGO_DB_URL,
      dbName: process.env.MONGO_DB_NAME,
    },
    fireBase: {
      config_DB: {
        "type": "service_account",
        "project_id": "ecommerce-2d03b",
        "private_key_id": "bd297792c51f26ea852be8328d187b816945b913",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSN4/xP+fnvCCP\nkpCd/Cp69p0PgIfKX9AghrI61HQ4r2ogW0yoQ4tEns/zWvYxpgH2d2xvns4Han2j\nTue7KnX1TMmrV1pVtYUv3+JRKewiqfxGWgsczSfVMNDnucCVp30oxI9vDRccxcEL\nEvk9+IVkzWDrfGXCPfipI9hIGBmG6Xvw3PN3yioqSoz307OMzoEQlOyfVMB4f11B\nFN9Ytnd2m2Ip5c0vDD0CbD2DYKpovyEyM5LBYJ47vSFEByiMVgR4kksCvRBF2UVP\n8kjuB8an4RDIIxZ4uh8dY/63UTFcaWCBXn4HYrQDgy5hLuDCPDEuJVoUm0i5KjWn\nPDkZitbdAgMBAAECggEALRgbKiLN0gGisHm9yQ4fZLpDTeCCAJEWGewbDpClj8Vd\nTCyZoJzAoss4i5kPJ+5XDHJo0fbsdl3LLr2N6zH8FM9QkY9PAwTJ2c+6gjOugm8Z\nfVPyf06pBUwP/C12GQRRTm3/4NAbjaIEO6ZpzffiUZHXARzxzT2y+kGEs05sJ2rJ\n/kKiaNL2j3W6AGGB9i53hTwxFqzNenlO48c3cKPYyehXR7VDUPm2HITyWMQ57MpG\nF49vtRk0Ux42XXvEbplEBv4bpo1A2knRs0+ABPq8sJ37+fskSaQeX0mXbrYz0+BJ\nCib0sfjk+hBaw/7x2admGnDtgsduIUNPrnEWryYgEQKBgQDxiU3+9s05zZUr0GVr\nJMxgGx+0nrGKJ8tVNZ+ADReMsgFtGJBXpP8JJHr0VWra1DRrK7NY9ZFsvCBN5jMI\nTBMWuXZ7i1SpxiWUMTKgeSjcg1oPUiB8BIwauHPPYU3ftipY1l9evfbu4fAKvg8U\nGZYzNUxIR8c+FhVLuCfrJjROtQKBgQDeziPXzmZD9sQMTehV8RLOGfI0J1EX08oD\nTwX64Ytjd0DvpkKs62P/SFAfv65vS+sRxLx+p7qEiaCRarNN/vxF51l03I4PQ86t\nwhEvhIa/6Hpbf8S0NMjfHvM/zRL6fyg9/QfwPlkPglWs/GueNp1+G2QZ06hwtSM6\nQtReQxTYiQKBgG4ufG36l9PufEXoYttlhfWxad0zJzomvRK5y3DWiA+ehBgIRJA2\nrEC3a39aF8yLUP4yiTXjj9tSVkoy4MTAL1UGdY4WGSD5Sts3NikOHB27rbGffUIV\nsPPfgLTxZlzO9LJh2E+XyLVgS+gamzZIFcR2Y731QGaKHFzWPR9/5gyhAoGASXh6\nc1B5gpHd5hzOr4BWbiY6Kx6H7C6Hn/2wACHd4AfUHvKZbAIXMHg9C6ser06+jlZs\nves7Yzcq/qjLxb1+nOKEKjgMlFYM0ll7Z0rxUFkt9/wy9iWt032WQwSx7G5/66kD\ntCIrJiUZcXivWDW0S4Bmyulz0u64Vh7xfr/qINkCgYBNXjvo8HI5xR1azOm2bQ3k\nZLg9HCOM9d35qRf4JRYbbWysfSqfZOrAR5R1ahU+K+vsuB3r7tdYiheB3WWrbmmn\n2du/8PUTjWl7PZfuUgcCSUeFShS3CnoNwmBprGXN66y8ziycSSIBBlriAXLsBA0C\nQON0qvl/6LeKQUjRXE+AMw==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-7tbws@ecommerce-2d03b.iam.gserviceaccount.com",
        "client_id": "112967420168260255919",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7tbws%40ecommerce-2d03b.iam.gserviceaccount.com"
      },
      dbName: process.env.FIREBASE_DB_NAME,
    }
  },
};

export { config };
