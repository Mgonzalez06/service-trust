"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
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
  styled,
} from "@mui/material";
import axios from "axios";


//import { registerUser } from "~~/contracts/deployedContracts";



const BlueContainer = styled(Box)(() => ({
    backgroundColor: "#00244a",
    height: "150px",
    textAlign: "center",
    position: "relative",
    width: "100%",
  }));


// Definición de tipos para nacionalidades y habilidades
interface Nationality {
  country: string;
  nationality: string;
}

const SignUp: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [cities, setCities] = useState<string[]>([]);
  const [nationality, setNationality] = useState<string>("");
  const [nationalities, setNationalities] = useState<Nationality[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("UserRegistry");

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
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`);
        const countryNationalityList: Nationality[] = response.data.map(
          (country: any) => ({
            country: country.name.common,
            nationality: country.demonyms?.eng?.m || "Not available",
          })
        );
        countryNationalityList.sort((a, b) =>
          a.nationality.localeCompare(b.nationality)
        );

        setNationalities(countryNationalityList);
      } catch (error) {
        console.error("Error fetching countries and nationalities", error);
      }
    };
    fetchCountries();
  }, []);

  const fetchCitiesByCountry = async (countryName: string) => {
    try {
      const response = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/cities`,
        {
          country: countryName,
        }
      );
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  };

  useEffect(() => {
    if (country) {
      fetchCitiesByCountry(country);
    }
  }, [country]);

  const handleSkillsChange = (event: ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target;
    setSkills(typeof value === "string" ? value.split(",") : (value as string[]));
  };

  const handleSignUp = async () => {
    try{
      await writeYourContractAsync({
        functionName: "registerUser",
        args: [
          name,
          lastName,
          password,
          country,
          city,
          //@ts-ignore
          //nationality,
          BigInt(123456789),
          birthdate,
          email,
          phone,
          //skills.toString()],
          "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
        ]
      });
    } catch (e) {
      console.error("Error registering user:", e);
    }
    
    /*await registerUser(
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
    );*/
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
                onChange={(e) => setCountry(e.target.value as string)}
                fullWidth
                sx={{ height: 40 }}
              >
                {nationalities.map((n) => (
                  <MenuItem key={n.country} value={n.country}>
                    {n.country}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" sx={{ color: "black" }}>
                City
              </Typography>
              <Select
                value={city}
                onChange={(e) => setCity(e.target.value as string)}
                fullWidth
                sx={{ height: 40 }}
              >
                {cities.map((cityName) => (
                  <MenuItem key={cityName} value={cityName}>
                    {cityName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1" sx={{ color: "black" }}>
                Nationality
              </Typography>
              <Select
                value={nationality}
                onChange={(e) => setNationality(e.target.value as string)}
                fullWidth
                sx={{ height: 40 }}
              >
                {nationalities.map((n) => (
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
                //@ts-ignore
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
              <Input fullWidth type="password" sx={{ height: 40 }} />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSignUp}>
              Sign Up
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignUp;