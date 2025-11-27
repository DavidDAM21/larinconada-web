import MaintenancePage from '../maintenance';

export default function HomePage() {
    // MAINTENANCE MODE: Set to true to show maintenance page
    const MAINTENANCE_MODE = false;

    if (MAINTENANCE_MODE) {
        return <MaintenancePage />;
    }

    // Original homepage code below (will be hidden when maintenance mode is active)
    return null;
}
