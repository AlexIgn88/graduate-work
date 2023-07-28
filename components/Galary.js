import { Box, Image, Grid } from '@chakra-ui/react';

export default function Galary({ imagesArr }) {
    return <>
        <Box
            p={4}
            mb={10}
        >
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                {imagesArr.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Картинка ${index + 1}`}
                    />
                ))}
            </Grid>
        </Box>
    </>
}