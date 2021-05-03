import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetup() {
    function addMeetupHandler(data) {
        console.log("Data ", data);
    }
    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetup;