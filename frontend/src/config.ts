// config.ts
interface AppConfig {
    apiUrl: string;
    // appName?: string;
    // version?: string;
    // isProduction?: boolean;
}

const config: AppConfig = {
    apiUrl: 'http://localhost:3000/api',
};

export default config;