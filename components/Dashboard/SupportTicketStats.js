import axios from "apis/axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function SupportTicketStats() {
  const [data, setData] = useState(null);
  const [param, setParam] = useState("today");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!data) {
      axios
        .get("/dashboard/get-support-ticket-stats")
        .then((res) => setData(res.data));
    } else {
      const activeCount =
        data[param].filter((i) => i.st == "active")[0]?.count || 0;
      const waitingCount =
        data[param].filter((i) => i.st == "waiting")[0]?.count || 0;
      const solvedCount =
        data[param].filter((i) => i.st == "solved")[0]?.count || 0;

      setStats({
        active: activeCount,
        waiting: waitingCount,
        solved: solvedCount,
        total: activeCount + waitingCount + solvedCount,
      });
    }
  }, [data, param]);
  return (
    <div className="card card-shadow">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="fw-bold mb-0">Support Tickets</h6>
        <select
          className="border-0 bg-light cursor-pointer"
          value={param}
          onChange={(e) => setParam(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="last7">Last 7 days</option>
          <option value="last30">Last 30 days</option>
          <option value="all">All Tickets</option>
        </select>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-around  text-center">
          <div>
            <h4>{stats ? stats.active : <Skeleton />}</h4>
            <strong className="text-green">Active</strong>
          </div>
          <div>
            <h4>{stats ? stats.waiting : <Skeleton />}</h4>
            <strong className="text-blue">Waiting</strong>
          </div>
          <div>
            <h4>{stats ? stats.solved : <Skeleton />}</h4>
            <strong className="text-violate">Solved</strong>
          </div>
          <div>
            <h4>{stats ? stats.total : <Skeleton />}</h4>
            <strong className="text-red">Total</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
