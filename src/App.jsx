import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';


// material ui imports
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


// Exeternal imports
import { useEffect, useState } from 'react';


// redux imports 
import { useDispatch, useSelector } from 'react-redux';
import { changeResult, fetchWeatherData } from './weatherApiSlice';

// date and time
import "moment/min/locales";
import moment from 'moment/moment';

// translation hook
import { useTranslation } from 'react-i18next';



moment.locale("ar")
function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => {
    return state.weather.isLoading
  })
  const temp = useSelector((state) => {
    console.log(state.weather.weather);

    return state.weather.weather
  })
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("")
  const theme = createTheme({
    typography: {
      fontFamily: ["IBM"]
    }, palette: {
      primary: {
        main: "rgb(28 52 91 / 36%)"
      }
    }
  });
  const [locale, setLocale] = useState("ar")

  let cancelAxios = null
  // event handellers
  function handleLanguageClick() {
    if (locale == "en") {
      setLocale("ar")
      i18n.changeLanguage("ar")
      moment.locale("ar")
    } else {
      setLocale("en")
      i18n.changeLanguage("en")
      moment.locale("en")
    }
    setDateAndTime(moment().format('dddd MMMM YYYY'))
  }
  useEffect(() => {
    dispatch(changeResult())
    i18n.changeLanguage("ar")
  }, [])
  useEffect(() => {
    dispatch(fetchWeatherData())
    setDateAndTime(moment().format('dddd MMMM YYYY'))

  }, [])
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" dir={locale == "ar" ? "rtl" : "ltr"}>
          <div className="contentContainer" style={{ width: "100%" }} >
            {/* card */}
            <div className="card" style={{ background: "rgb(28 52 91 / 36%)", borderRadius: "5px", boxShadow: "10px 10px 10px rgba(0,0,0,0.5)" }}>
              {/* name & time */}
              <div style={{ display: "flex", justifyContent: "start", alignItems: "center", }}>
                <div style={{ margin: "0px 20px" }}>
                  <Typography variant="h2" component="h2" style={{ fontWeight: 400, textTransform: "capitalize" }}>
                    {t("Cairo")}
                  </Typography>
                </div>
                <div style={{ margin: "0px 20px" }}>
                  <Typography variant="h5" component="h5" style={{ fontWeight: 200 }}>
                    {dateAndTime}
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
                      {isLoading ? (<CircularProgress style={{ color: "white" }} />) : temp.number}

                    </Typography>
                    <img src={temp.icon} alt={temp.description} />
                  </div>
                  {/* state */}
                  <div>
                    <Typography variant="h6" component="h6" style={{ fontWeight: 200, margin: "15px" }}>
                      {t(temp.description)}
                    </Typography>
                  </div>
                  {/* min & max */}
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <h6 style={{ margin: "0px 10px", fontWeight: "400" }}>{t("Min")} {temp.min}</h6>
                    <h6 style={{ margin: "0px 10px", fontWeight: "400" }}> |</h6>
                    <h6 style={{ margin: "0px 10px", fontWeight: "400" }}>{t("Max")} {temp.max}</h6>

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
              <Button variant="text" style={{ color: "rgb(28 52 91 / 36%)", marginTop: "20px", padding: "10px", textTransform: "capitalize" }}
                onClick={handleLanguageClick}>{locale == "en" ? "Arabic" : "إنجليزي"}</Button>
            </div>
          </div>
        </Container>
      </ThemeProvider >
    </>
  )
}

export default App
