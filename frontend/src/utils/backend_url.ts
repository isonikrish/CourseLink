const isBackendDeployed = false;

export const BACKEND_URL = isBackendDeployed 
  ? "https://courselink-backend.isonikrish.workers.dev/api/v1" 
  : "http://localhost:8787/api/v1";
