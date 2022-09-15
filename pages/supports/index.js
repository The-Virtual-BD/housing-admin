import { Icon } from "@iconify/react";
import axios from "apis/axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Supports() {
  const [conversations, setConversations] = useState(null);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    axios
      .get(`/support_conversations?id=${data.query}`)
      .then((res) => setConversations(res.data));
  };

  useEffect(() => {
    axios
      .get("/support_conversations")
      .then((res) => setConversations(res.data));
  }, []);
  return (
    <>
      <h5 className="py-4">My Requests</h5>
      <div className="card rounded-3 shadow">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 col-lg-4 ps-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="form-control border-0 bg-light"
                  type="text"
                  placeholder="Search Request"
                  {...register("query")}
                />
                <input className="d-none" type="submit" />
              </form>
            </div>
          </div>
          <div className="row">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Subject</th>
                  <th>Created</th>
                  <th>Last Activity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {conversations &&
                  conversations.map((item) => (
                    <tr
                      className="cursor-pointer"
                      onClick={() => router.push(`/supports/${item.id}`)}
                      key={item.id}
                    >
                      <td>{item.id}</td>
                      <td>{item.subject}</td>
                      <td>{moment(item.created_at).format("D MMMM YYYY")}</td>
                      <td>{moment(item.updated_at).fromNow()}</td>
                      <td>
                        <Icon
                          width={20}
                          height={20}
                          className={
                            item.status == "active"
                              ? "text-green"
                              : item.status == "waiting"
                              ? "text-blue"
                              : "text-violate"
                          }
                          icon={
                            item.status == "active"
                              ? "akar-icons:circle-fill"
                              : item.status == "waiting"
                              ? "akar-icons:clock"
                              : "charm:circle-tick"
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
