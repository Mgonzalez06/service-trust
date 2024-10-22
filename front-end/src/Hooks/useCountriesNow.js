import { useState, useEffect } from "react";
import axios from "axios";

const useCountriesNow = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/all`);
      const countryNationalityList = response.data.map((country) => ({
        country: country.name.common,
        nationality: country.demonyms?.eng?.m || "Not available",
      }));

      countryNationalityList.sort((a, b) =>
        a.nationality.localeCompare(b.nationality)
      );
      setCountries(countryNationalityList);
    } catch (error) {
      setError("Error fetching countries and nationalities");
      console.error(error);
    } finally {
      setLoadingCountries(false);
    }
  };

  const fetchCitiesByCountry = async (countryName) => {
    setLoadingCities(true);
    try {
      const response = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/cities`,
        {
          country: countryName,
        }
      );
      setCities(response.data.data);
    } catch (error) {
      setError("Error fetching cities");
      console.error(error);
    } finally {
      setLoadingCities(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return {
    countries,
    cities,
    loadingCountries,
    loadingCities,
    error,
    fetchCitiesByCountry,
  };
};

export default useCountriesNow;
