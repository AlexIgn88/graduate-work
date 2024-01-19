import { Grid, Box, Heading, List, ListItem, Stack, Text, Card, CardBody, CardFooter, ButtonGroup } from '@chakra-ui/react';
import { ModalWindowRecordingForATour } from "../components/modalwindows/ModalWindowRecordingForATour";
import Image from 'next/image';


export default function TourCardsMini({ tourData }) {

    return <Grid
        templateColumns={{
            base: "repeat(1, 1fr)",
            '2xl': "repeat(3, 1fr)", // 1536px
            xl: "repeat(3, 1fr)",    // 1280px
            lg: "repeat(3, 1fr)",    // 992px
            md: "repeat(2, 1fr)",    // 768px
            m: "repeat(2, 1fr)",     // 560px дополнительный брейк-поинт
            sm: "repeat(1, 1fr)"     // 480px
        }}

        gap={5}
        justifyItems={'center'}
    >
        {tourData.map(tour => (
            <Box
                key={tour.tourName}
            >
                <Card maxW='sm' h={'100%'}>
                    <CardBody h={'100%'} display={'Flex'} flexDirection={'column'} alignItems={'center'}>
                        <Image
                            src={tour.tourImage ?? '/img/tourcard.jpg'}
                            alt={'tour'}
                            height={200}
                            width={300}
                            priority={true}
                            style={{
                                borderRadius: '10px',
                                height: '200px',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />

                        <Stack mt='6' spacing='3'>
                            <Heading
                                size='md'
                                textAlign={'center'}
                            >
                                {tour.tourName}
                            </Heading>
                            <List textAlign={'justify'}>
                                {tour.tourInformation.map((item, i) => (
                                    <ListItem key={i}>
                                        {Object.values(item)[0]}
                                    </ListItem>
                                ))}
                                <Text color='blue.600' fontSize='2xl'>
                                    {tour.tourInformation.price}
                                </Text>
                            </List>
                        </Stack>
                    </CardBody>
                    <CardFooter justifyContent={'center'}>
                        <ButtonGroup spacing='2'>
                            <ModalWindowRecordingForATour />
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </Box>
        ))}
    </Grid>
}

