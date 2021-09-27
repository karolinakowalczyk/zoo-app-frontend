import React from "react";
import { Container, Grid, Box, Link } from '@mui/material/';

const Footer = () => {
  return (
    <footer>
        <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        my={-1}
        bgcolor="#777777"
        color="white"
      >
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{
                    fontSize: '2rem'
            }}>
            Address: Wróblewskiego 1-5, 51-618 Wrocław
            </Box>
            <Box textAlign="center" sx={{
                fontSize: '1rem'
            }}>
                      <p>Icons made by <Link href="https://www.freepik.com">Freepik</Link> from <Link href="https://www.flaticon.com/">www.flaticon.com</Link></p>
                      <p>Images made by <Link href="https://pixabay.com/pl/">Pixabay</Link></p>
            </Box>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Zoo App &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;