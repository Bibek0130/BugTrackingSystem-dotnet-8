function Dashboard() {
    return (
        <>
            <div className="header">
                <h1>Dashboard</h1>
            </div>

            <div className="container-fluid">
                <div className="row" style={blueColor}>
                    <div className="col-lg-4 col-12" style={ redColor}>Red
                    </div>
                    <div className="col-lg-4 col-12"> Blue
                    </div>
                    <div className="col-lg-4 col-12" style={yellowColor}> White
                    </div>
                </div>
            </div>
        </>
      
    );
}

export default Dashboard;

const redColor = {
    backgroundColor: "red",
    width: "200px",
    innerHeight: "200px",

}
const blueColor = {
    backgroundColor: "blue"
    
}
const yellowColor = {
    backgroundColor: "yellow"

}

