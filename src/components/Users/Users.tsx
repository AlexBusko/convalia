import React, { FC } from "react";
import { UserType } from "../../types/types";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { Row, Col, Card } from "antd";

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

let Users: FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  users,
  followingInProgress,
  follow,
  unfollow,
  ...props
}) => {
  return (
    <div className="users">
      <Paginator
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      <Row gutter={[16, 16]}>
        {users.map((u) => (
          <Col xs={24} sm={12} md={12} lg={8}>
            <Card className="user-card">
              <User
                user={u}
                key={u.id}
                followingInProgress={followingInProgress}
                unfollow={unfollow}
                follow={follow}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Users;
