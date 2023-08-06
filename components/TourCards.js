import { Heading, Box, Image, List, ListItem, ListIcon, Stack } from '@chakra-ui/react';
import { Card, CardBody, CardFooter } from '@chakra-ui/react';
import { ModalWindowRecordingForATour } from "../components/modalwindows/ModalWindowRecordingForATour";
import { FaBusAlt } from 'react-icons/fa';

export default function TourCards({ tourData }) {

    return <List spacing={3} mb={10}>
        {tourData.map(tour => (
            <ListItem key={tour.tourName}>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                >
                    <Image
                        src={tour.tourImage ? tour.tourImage : '/img/tourcard.jpg'}
                        alt={'tour'}
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                    />

                    <Stack>
                        <CardBody>
                            <Heading size='md'>{tour.tourName}</Heading>
                            <Box py='2'>
                            <List textAlign={'justify'}>
                                    {tour.tourInformation.map((item, i) => (
                                        <ListItem key={i}>
                                            {/* <ListIcon as={FaBusAlt} color='yellow.500' /> */}
                                            {Object.values(item)[0]}
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </CardBody>
                        <CardFooter>
                            {/* <Button variant='solid' colorScheme='blue'>
                            Записаться
                        </Button> */}
                            <ModalWindowRecordingForATour />
                        </CardFooter>
                    </Stack>
                </Card>
            </ListItem>
        ))}
    </List>
}