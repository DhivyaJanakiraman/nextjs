// runs only in server side
// runs whenever a req is received for this url POST /api/new-meetup

function handler(req, res) {
    if(req.method === 'POST') {
        const data = req.body;
        const { title, image, address, description} = data;
    }
}

export default handler;