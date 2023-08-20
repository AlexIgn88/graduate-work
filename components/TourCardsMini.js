import { Heading, List, ListItem, Stack, Text, Card, CardBody, CardFooter, Divider, ButtonGroup } from '@chakra-ui/react';
import { ModalWindowRecordingForATour } from "../components/modalwindows/ModalWindowRecordingForATour";
import Image from 'next/image';


export default function TourCardsMini({ tourData }) {

    return <List
        spacing={3}
        mb={10}
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'center'}
    >
        {tourData.map(tour => (
            <ListItem
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
                            <Heading size='md'>{tour.tourName}</Heading>
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
                    <Divider />
                    <CardFooter justifyContent={'center'}>
                        <ButtonGroup spacing='2'>
                            <ModalWindowRecordingForATour />
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </ListItem>
        ))}
    </List>
}

