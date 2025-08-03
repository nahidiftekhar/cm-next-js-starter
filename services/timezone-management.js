const moment = require('moment-timezone');
moment.tz.link('countries.json'); // Load country data

export function getTimeZonesForCountry(countryCode) {
  const timeZones = [];

  const timeZoneNames = moment.tz.names();
  const now = new Date();

  timeZoneNames.forEach((tzName) => {
    const tz = moment.tz.zone(tzName);
    const countryData = tz.countries();

    if (countryData.includes(countryCode)) {
      const offsetInMinutes = tz.utcOffset(now);
      const isNegative = offsetInMinutes < 0;
      const hours = Math.floor(Math.abs(offsetInMinutes) / 60);
      const minutes = Math.abs(offsetInMinutes) % 60;
      const sign = isNegative ? '+' : '-';
      const offset = `GMT${sign}${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;

      timeZones.push({ name: tzName, offset });
    }
  });

  return timeZones;

  //   const timeZones = [];

  //   moment.tz.names().forEach((tzName) => {
  //     const countryData = moment.tz.zone(tzName).countries();
  //     if (countryData.includes(countryCode)) {
  //       timeZones.push(tzName);
  //     }
  //   });

  //   return timeZones;
}
