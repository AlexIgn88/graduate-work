import { Heading, Box, Image, List, ListItem, ListIcon, Stack } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
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
                    {/* <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    // src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                    // scr='/img/favicon.png'
                    alt='tour'
                /> */}
                    <Image
                        src={'/img/favicon.png'}
                        alt={'tour'}
                        // w={'82px'}
                        // h={'82px'}
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                    />

                    <Stack>
                        <CardBody>
                            <Heading size='md'>{tour.tourName}</Heading>
                            <Box py='2'>
                                <List >
                                    {tour.tourInformation.map((item, i) => (
                                        <ListItem key={i}>
                                            <ListIcon as={FaBusAlt} color='yellow.500' />
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