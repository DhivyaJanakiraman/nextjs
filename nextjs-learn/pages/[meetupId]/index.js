import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails() {
  return (
    <MeetupDetail 
    image="https://homepages.cae.wisc.edu/~ece533/images/boat.png"
    title="Sample title"
    description="Sample desc"
    address="Sample addrr"
    />
  );
}

export async function getStaticPaths() {
    return {
        //all meetupIds for which the pages should be pre-generated
        fallback: true,
        paths: [
            {
                params: {
                    meetupId: 'm1'
                }
            },
            {
                params: {
                    meetupId: 'm2'
                }
            }
        ]
    }
}

export async function getStaticProps(context) {
// fetch the details for this meetup
const meetupId = context.params.meetupId; 
console.log("MeetupId inside getStatic prop", meetupId);   
return {
        props: {
            meetupData: {
                image: 'https://homepages.cae.wisc.edu/~ece533/images/boat.png',
                id: meetupId,
                title: 'First Meetup',
                address: '1234 Abcd ST',
                description: 'Sample 1st meetup'
            }
        }
    }
}

export default MeetupDetails;
