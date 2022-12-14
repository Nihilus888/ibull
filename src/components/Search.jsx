import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { borders } from "@mui/system";
import { shadows } from "@mui/system";
import LineChart from "./stockView/Line";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const theme = createTheme();

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
    align: "center",
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    align: "center",
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    align: "center",
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    align: "center",
  },
};

const Search = (props) => {
  const navigate = useNavigate();
  const [searchPass, setSearchPass] = useState(null);
  const [searchData, setSearchData] = useState({
    search: "",
    pg: 1,
  });
  const [stockId, setStockId] = useState(null);
  const [savedData, setSavedData] = useState([]);

  const handleChange = (e) => {
    setSearchData({
      [e.target.name]: e.target.value,
    });
    console.log(searchData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/stock/search`, {
      method: "POST",
      body: JSON.stringify(searchData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log("Search Response: ", response);
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.error) {
          console.log("jsonResponse.error: ", jsonResponse.error);
          return;
        }
        console.log(jsonResponse);
        setSearchPass(jsonResponse);
      });

  };

  const handleSave = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("user_token");
    if (token) {
      //retrieves the necessary information when we click on save
      setStockId({
        id: event.target.value,
      });
      console.log("event.target.value: ", event.target.value);
    }
    //if there is no token, we cannot let them save it and instead let them navigate to login
    else {
      navigate("/login");
    }
  };

  //Fetch the user's saved stocks data
  const fetchSavedData = async () => {
    let token = localStorage.getItem("user_token");
    if (token) {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/stock/saved`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      console.log("data:", data);

      try {
        setSavedData(data);
      } catch (err) {
        console.log("No saved stock data present at the moment");
      }
    }
  };

  //save jobs
  useEffect(() => {
    let token = localStorage.getItem("user_token") || "";

    //if our stock id is null return null
    if (stockId === null) {
      return;
    }

    //if our stock id not null we shall post it into the database for storage
    fetch(`${process.env.REACT_APP_BACKEND_URL}/stock/saved`, {
      method: "POST",
      body: JSON.stringify(stockId),
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("response: ", response);

        toast.success("Save stock successful", {
          theme: "colored",
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: true,
        });
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.error) {
          toast.error("Unable to save stock", {
            theme: "colored",
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: true,
          });
          console.log("jsonResponse.error: ", jsonResponse.error);
          return;
        }

        console.log("Save Stock Successful!", jsonResponse);
      })
      .catch((err) => {
        console.log("err: ", err);
      });

    setTimeout(() => {
      fetchSavedData();
    }, "600");
  }, [stockId]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{ marginTop: 5, paddingBottom: 1, align: "center" }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            width: "50%",
            mb: "100px",
            border: 1,
            borderRadius: "25%",
            borderColor: "grey.500",
            backgroundColor: "primary.main",
            boxShadow: 20,
          }}
          onSubmit={handleSubmit}
        >
          <InputBase
            sx={{
              ml: 5,
              flex: 1,
              flexDirection: "row",
              color: "primary.text",
              fontWeight: "bold",
              alignContent: "center",
              justifyContent: "center",
              align: "center",
              fontSize: 20,
              textTransform: "capitalize",
              fontFamily: "Segoe UI Symbol",
            }}
            placeholder="Search Stocks"
            id="search"
            name="search"
            label="search"
            value={searchData.search}
            onChange={handleChange}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px", color: "primary.text", fontWeight: "bold" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>

      {searchPass ? (
        <Container maxWidth="xl">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.secondary"
            fontWeight="bold"
            mt={4}
            mr={10}
            mb={4}
            ml={5}
            fontStyle="bold"
            sx={{ mr: 1 }}
          >
            {searchPass ? "Your Search Results" : ""}
          </Typography>
          <Carousel responsive={responsive} ml={100} mb={10} align="center">
            {/* {searchPass ? searchPass.map((stock) => ( */}
            <Card
              key={searchPass[0]}
              sx={{
                height: "100%",
                width: "50%",
                display: "flex",
                flexDirection: "column",
                margin: "normal",
                mr: 2,
                alignContent: "center",
                backgroundColor: "#37FDFC",
                opacity: "0.8",
                color: "black",
                boxshadow: 3,
              }}
            >
              <CardContent sx={{ flexGrow: 1, variant: "outlined", mr: 2 }}>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h2"
                  fontWeight="bold"
                  display="inline-flex"
                >
                  Name: {searchPass[0]}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="h3"
                  fontWeight="bold"
                  fontStyle="italic"
                >
                  Currency: {searchPass[1]}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="h4"
                  lineheight={2}
                >
                  Enterprise Value: {searchPass[2]}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  fontWeight="medium"
                  fontStyle="italic"
                >
                  Forward PE: {searchPass[3]}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  fontWeight="medium"
                  fontStyle="italic"
                >
                  Profit Margins: {searchPass[4]}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  fontWeight="medium"
                  fontStyle="italic"
                >
                  Predicted Price: ${searchPass[12]}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", mb: 2 }}>
                <Button
                  sx={{ mr: 1, opacity: "1" }}
                  key={searchPass[0]}
                  value={searchPass[0]}
                  size="small"
                  variant="contained"
                  color="success"
                  align="center"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          </Carousel>

          <LineChart data={searchPass[11]} sx={{ mt: 5, mb: 5 }} />

          <TableContainer sx={{ mt: 5 }} component={Paper}>
            <Table
              sx={{ minWidth: 650, backgroundColor: "white", color: "#FFFFFF" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell aliign="center">Stock Name</TableCell>
                  <TableCell align="center">Currency:</TableCell>
                  <TableCell align="center">Enterprise Value:</TableCell>
                  <TableCell align="center">Forward PE:</TableCell>
                  <TableCell align="center">Profit Margins:</TableCell>
                  <TableCell align="center">Float Shares:</TableCell>
                  <TableCell align="center">Shares Outstanding:</TableCell>
                  <TableCell align="center">Shares Short:</TableCell>
                  <TableCell align="center">Short Ratio:</TableCell>
                  <TableCell align="center">Beta:</TableCell>
                  <TableCell align="center">Price to Book:</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {searchPass.map((stocks) => ( */}
                <TableRow
                  key={searchPass[0]}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {searchPass[0]}
                  </TableCell>
                  <TableCell align="center">{searchPass[1]}</TableCell>
                  <TableCell align="center">{searchPass[2]}</TableCell>
                  <TableCell align="center">{searchPass[3]}</TableCell>
                  <TableCell align="center">{searchPass[4]}</TableCell>
                  <TableCell align="center">{searchPass[5]}</TableCell>
                  <TableCell align="center">{searchPass[6]}</TableCell>
                  <TableCell align="center">{searchPass[7]}</TableCell>
                  <TableCell align="center">{searchPass[8]}</TableCell>
                  <TableCell align="center">{searchPass[9]}</TableCell>
                  <TableCell align="center">{searchPass[10]}</TableCell>
                </TableRow>
                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
};

export default Search;
