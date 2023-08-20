import { Box, Grid } from '@chakra-ui/react';
import Image from 'next/image';

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
                        height={500}
                        width={500}
                        priority={true}
                        style={{
                            borderRadius: '5px',
                            width: '40vw',
                            height: '20vw',
                        }}
                    />
                ))}
            </Grid>
        </Box>
    </>
}