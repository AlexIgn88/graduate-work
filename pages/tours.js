import Head from "next/head";
import { Box } from '@chakra-ui/react';
import { tourDataCrimea, tourDataKarelia, tourDataKamchatka, tourDataVoronezh } from '../data/tourData';
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';
import TourCardsMini from '../components/TourCardsMini';

export default function ToursPage() {

    const allTourData = tourDataCrimea.concat(tourDataKarelia, tourDataKamchatka, tourDataVoronezh);

    return <>
        <Head>
            <title>Заказать тур</title>
        </Head>
        <Box
            className='tours-page'
            m={marginParameters}
            mt={halfMarginParameters}
            mb={halfMarginParameters}
        >
            <TourCardsMini tourData={allTourData} />
        </Box>
    </>
}