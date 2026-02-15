// config.ts
interface AppConfig {
    apiUrl: string[];
    // appName?: string;
    // version?: string;
    // isProduction?: boolean;
}
//'https://game-backend-dr99.onrender.com/api',
const config: AppConfig = {
    apiUrl: [ "https://game-backend-dr99.onrender.com/api"],
};

export default config;
