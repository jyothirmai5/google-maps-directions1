
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import locationlist from './airports.json';
import { useState } from 'react';
import './App.css';

interface AirportDetails {
  code: string,
  name: string,
  city: string,
  state: string,
  statename: string,
  lat: number,
  lng: number,
  search: string
}

function App() {
  const [airportOrigin, setAirportOrigin] = useState<AirportDetails>({
    code: '',
    name: '',
    city: '',
    state: '',
    statename: '',
    lat: 0,
    lng: 0,
    search: ''
  })
  const [airportDestination, setAirportDestination] = useState<AirportDetails>({
    code: '',
    name: '',
    city: '',
    state: '',
    statename: '',
    lat: 0,
    lng: 0,
    search: ''
  })
  const [distance, setDistance] = useState(0)

  function onChangeAirport(e: any, value: AirportDetails | null, type: number) {
    console.log('value for airport', e.target, value);
    if (type === 1 && value) {
      setAirportOrigin(value);
    } else {
      if (value) {
        setAirportDestination(value);
      }
    }
  }

  function calculateRoute() {
    if (airportOrigin && airportDestination) {
      let lat1 = airportOrigin.lat;
      let lat2 = airportDestination.lat;
      let lon1 = airportOrigin.lng;
      let lon2 = airportDestination.lng;
      let distance: any = 3963 * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
      distance = distance.toFixed(2);
      setDistance(distance);
    } else {
      setDistance(0);
    }
  }

  function navigateRoute() {
    window.open('https://www.google.com/maps/dir/?api=1' + '&origin=' + airportOrigin.name + '&destination=' + airportDestination.name)
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: AirportDetails) => `${option.search}`
  });

  return (
    <div className="header-block">
      <h1>Calculate distance between 2 Airports</h1>
      <Stack spacing={6} sx={{ width: 500 }} className="stack">
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 300 }}
          filterOptions={filterOptions}
          options={locationlist}
          autoHighlight
          onChange={(e, value) => onChangeAirport(e, value, 1)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Origin Airport"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
        <Autocomplete
          id="country-select-demo1"
          sx={{ width: 300 }}
          filterOptions={filterOptions}
          options={locationlist}
          autoHighlight
          onChange={(e, value) => onChangeAirport(e, value, 2)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Destination Airport"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Stack>
      <div className='button-group'>
        <Button type='submit' variant="contained" onClick={calculateRoute}>
          Calculate Distance
        </Button>
        <Button type='submit' variant="contained" onClick={navigateRoute} style={{ "marginLeft": '20px' }}>
          Show Navigation
        </Button>
      </div>

      <h2>Distance: {distance} </h2>
    </div >
  )
}

export default App;
