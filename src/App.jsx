import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';


// material ui imports
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


// Exeternal imports
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["IBM"]
    }, palette: {
      primary: {
        main: "rgb(28 52 91 / 36%)"
      }
    }
  });
  const [temp, setTemp] = useState({
    number: null,
    min: null,
    max: null,
    description: "",
    icon: null
  })
  let cancelAxios = null
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=30.06263&lon=31.24967&appid=7d86729136d5d45dea476fbc6ddcf546`, {
      cancelToken: new axios.CancelToken((c) => {
        cancelAxios = c
      })
    })
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 272.15)
        const min = Math.round(response.data.main.temp_min - 272.15)
        const max = Math.round(response.data.main.temp_max - 272.15)
        const description = response.data.weather[0].description
        const icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`

        setTemp({ number: responseTemp, min, max, description, icon })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    return (() => {
      cancelAxios()
    })
  }, [])
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" dir="rtl">
          <div className="contentContainer" style={{ width: "100%" }} >
            {/* card */}
            <div className="card" style={{ background: "rgb(28 52 91 / 36%)", borderRadius: "5px", boxShadow: "10px 10px 10px rgba(0,0,0,0.5)" }}>
              {/* name & time */}
              <div style={{ display: "flex", justifyContent: "start", alignItems: "end", }}>
                <div style={{ margin: "0px 20px" }}>
                  <Typography variant="h2" component="h2" style={{ fontWeight: 400, textDecoration: "capetalize" }}>
                    القاهرة
                  </Typography>
                </div>
                <div style={{ margin: "0px 20px" }}>
                  <Typography variant="h5" component="h5" style={{ fontWeight: 200 }}>
                    الأحد-23-2025
                  </Typography>
                </div>
              </div>
              {/* name & time */}
              <hr style={{ width: "100%" }} />
              {/* temp & icon */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* temp */}
                <div>
                  {/* temp */}
                  <div style={{ display: "flex" }}>
                    <Typography variant="h2" component="h2" style={{ fontWeight: 200, margin: "15px" }}>
                      {temp.number}
                    </Typography>
                    <img src={temp.icon} alt={temp.description} />
                  </div>
                  {/* state */}
                  <div>
                    <Typography variant="h6" component="h6" style={{ fontWeight: 200, margin: "15px" }}>
                      {temp.description}
                    </Typography>
                  </div>
                  {/* min & max */}
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <h6 style={{ margin: "0px 10px", fontWeight: "400" }}>الصغرى {temp.min}</h6>
                    <h6 style={{ margin: "0px 10px", fontWeight: "400" }}> |</h6>
                    <h6 style={{ margin: "0px 10px", fontWeight: "400" }}>الكبرى {temp.max}</h6>

                  </div>
                </div>
                {/* icon*/}
                <div>
                  <CloudIcon style={{ fontSize: "200px" }} />
                </div>
              </div>
            </div>
            {/* card */}
            {/* button */}
            <div style={{ width: "100%", display: "flex", justifyContent: "end", alignItems: "center" }}>
              <Button variant="text" style={{ color: "rgb(28 52 91 / 36%)", marginTop: "20px", padding: "10px" }}>إنجليزي</Button>
            </div>
          </div>
        </Container>
      </ThemeProvider >
    </>
  )
}

export default App
