declare var $ENV: IEnv;

interface IEnv {
  TITLE: string;
  CLIENT_PORT: string;
  BACKEND_HOST_NAME: string;
  BACKEND_PORT: string;
  SOCKET_IOCLIENT_BASE_URL: string;
  SOCKET_IO_PORT: string;
  KEYCLOAK_URL: string;
  KEYCLOAK_REALM: string;
  KEYCLOAK_CLIENT_ID: string;
  ORIGIN: string;
  RUNMODE: string;
  VC_SCHEMA_INDEX_FILE_URL: string;
}
