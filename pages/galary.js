import Head from "next/head";
import { Box } from '@chakra-ui/react';
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';
import Galary from '../components/Galary';
import { crimeaImages, kareliaImages, kamchatkaImages, voronezhImages } from '../data/tourData';

export default function GalaryPage() {

    const allImages = crimeaImages.concat(kareliaImages, kamchatkaImages, voronezhImages);

    return <>
        <Head>
            <title>Галерея</title>
        </Head>

        <Box
            className="galary-page"
            m={marginParameters}
            mt={halfMarginParameters}
            mb={halfMarginParameters}
        >
            <Galary imagesArr={allImages} />
        </Box>
    </>
}