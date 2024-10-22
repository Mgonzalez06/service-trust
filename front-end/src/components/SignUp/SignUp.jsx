import { useEffect, useState } from "react";
import {
  useMediaQuery,
  Box,
  Stack,
  Typography,
  Input,
  Button,
  MenuItem,
  Select,
  Grid,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { BlueContainer } from "../Dashboard/Dashboard";
import { registerUser } from "../../utils/userRegistryfunctions";
import useCountriesNow from "../../Hooks/useCountriesNow";

export const SignUp = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [nationality, setNationality] = useState("");
  const [skills, setSkills] = useState([]);

  const {
    countries,
    cities,
    fetchCitiesByCountry,
    loadingCountries,
    loadingCities,
  } = useCountriesNow();

  const availableSkills = [
    "Basic medical care",
    "Medication administration",
    "Personal care",
    "Emotional support",
    "Mobility and exercise assistance",
    "Meal preparation",
    "Household cleaning",
    "Appointment management",
    "First aid",
    "Dementia/Alzheimer's knowledge",
  ];

  useEffect(() => {
    if (country) {
      fetchCitiesByCountry(country);
    }
  }, [country]);

  const handleSkillsChange = (event) => {
    const { value } = event.target;
    setSkills(typeof value === "string" ? value.split(",") : value);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");

    await registerUser(
      name,
      lastName,
      password,
      country,
      city,
      nationality,
      birthdate,
      email,
      phone,
      skills
    );
  };

  return (
    <Stack
      display="flex"
      flexDirection="column"
      alignContent="center"
      height="100vh"
    >
      <BlueContainer />
      <Stack
        display="flex"
        flexDirection="column"
        width="100%"
        height="100%"
        alignItems="center"
      >
        <Stack
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width={isMobile ? "90%" : "60%"}
          height="100%"
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            sx={{ color: "black" }}
          >
            Sign Up
          </Typography>
          <Grid container spacing={2} mt={0}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" sx={{ color: "black" }}>
                First Name
              </Typography>
              <Input
                fullWidth
                type="text"
                onChange={(e) => setName(e.target.value)}
                sx={{ height: 40 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" sx={{ color: "black" }}>
                Last Name
              </Typography>
              <Input
                fullWidth
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                sx={{ height: 40 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" sx={{ color: "black" }}>
                Email
              </Typography>
              <Input
                fullWidth
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                sx={{ height: 40 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" sx={{ color: "black" }}>
                Country
              </Typography>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                fullWidth
                sx={{ height: 40 }}
              >
                {loadingCountries ? (
                  <MenuItem disabled>Loading countries...</MenuItem>
                ) : (
                  countries.map((countryItem) => (
                    <MenuItem
                      key={countryItem.country}
                      value={countryItem.country}
                    >
                      {countryItem.country}
                    </MenuItem>
                  ))
                )}
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" sx={{ color: "black" }}>
                City
              </Typography>
              <Select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
                sx={{ height: 40 }}
              >
                {loadingCities ? (
                  <MenuItem disabled>Loading cities...</MenuItem>
                ) : (
                  cities.map((cityName) => (
                    <MenuItem key={cityName} value={cityName}>
                      {cityName}
                    </MenuItem>
                  ))
                )}
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" sx={{ color: "black" }}>
                Nationality
              </Typography>
              <Select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                fullWidth
                sx={{ height: 40 }}
              >
                {countries.map((n) => (
                  <MenuItem key={n.nationality} value={n.nationality}>
                    {n.nationality}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" sx={{ color: "black" }}>
                Birthdate
              </Typography>
              <Input
                fullWidth
                type="date"
                onChange={(e) => setBirthdate(e.target.value)}
                sx={{ height: 40 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" sx={{ color: "black" }}>
                Phone
              </Typography>
              <Input
                fullWidth
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                sx={{ height: 40 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" sx={{ color: "black" }}>
                Skills
              </Typography>
              <Select
                multiple
                value={skills}
                onChange={handleSkillsChange}
                renderValue={(selected) => selected.join(", ")}
                fullWidth
                sx={{ height: 40 }}
              >
                {availableSkills.map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    <Checkbox checked={skills.indexOf(skill) > -1} />
                    <ListItemText primary={skill} />
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ color: "black" }}>
                Password
              </Typography>
              <Input
                fullWidth
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ height: 40 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ color: "black" }}>
                Confirm Password
              </Typography>
              <Input
                fullWidth
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ height: 40 }}
              />
            </Grid>
          </Grid>

          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            {passwordError && (
              <Typography color="error" variant="body2" textAlign="center">
                {passwordError}
              </Typography>
            )}
            <Button
              variant="contained"
              sx={{ mt: 2, width: "fit-content" }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
