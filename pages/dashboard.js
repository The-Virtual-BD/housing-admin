import ApplicationStats from "components/Charts/ApplicationChart";
import UserJoiningStats from "components/Charts/UserJoiningChart";
import MessageStats from "components/Dashboard/MessageStats";
import Overview from "components/Dashboard/Overview";
import SubdivisionStats from "components/Dashboard/SubdivisionStats";
import SupportTicketStats from "components/Dashboard/SupportTicketStats";
import withAuth from "HOC/withAuth";

function Dashboard() {
  return (
    <>
      <h3>Dashboard</h3>
      <Overview />
      <div className="row mt-3">
        <div className="col-12 col-lg-6">
          <ApplicationStats />
          <div className="my-3"></div>
          <UserJoiningStats />
        </div>
        <div className="col-12 col-lg-6">
          <MessageStats />
          <div className="my-3"></div>
          <SupportTicketStats />
          <div className="my-3"></div>
          <SubdivisionStats />
        </div>
      </div>
    </>
  );
}

export default withAuth(Dashboard);
