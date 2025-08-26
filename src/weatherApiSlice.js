import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherData = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=30.06263&lon=31.24967&appid=7d86729136d5d45dea476fbc6ddcf546`
    );
    const number = Math.round(response.data.main.temp - 272.15);
    const min = Math.round(response.data.main.temp_min - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);
    const description = response.data.weather[0].description;
    const icon = response.data.weather[0].icon;
    return {
      number,
      min,
      max,
      description,
      icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
    };
  }
);
const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    isLoading: false,
    weather: {},
  },
  reducers: {
    changeResult: (state, action) => {
      state.result = "changed";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(state, action);

        state.weather = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
