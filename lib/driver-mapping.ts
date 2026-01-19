import { Archetype } from './personality-model';

export interface Driver {
    name: string;
    team: string;
    number: number;
    nationality: string;
    image_url: string;
}

// Map archetypes to driver names
export const archetypeDriverMap: Record<string, string[]> = {
    champion: ["Max Verstappen", "Lewis Hamilton"],
    quali_specialist: ["Lando Norris", "Oscar Piastri"],
    strategist: ["Fernando Alonso", "George Russell"],
    attacker: ["Pierre Gasly", "Liam Lawson"],
    defender: ["Carlos Sainz", "Nico Hülkenberg"]
};

// Get matched driver for an archetype
export function getMatchedDriver(archetype: Archetype, drivers: Driver[]): Driver | null {
    const driverNames = archetypeDriverMap[archetype.id];
    if (!driverNames || driverNames.length === 0) return null;

    // Find the first matching driver
    const matched = drivers.find(d => driverNames.includes(d.name));
    return matched || null;
}
