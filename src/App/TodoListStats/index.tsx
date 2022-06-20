import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import {useRecoilValue, useRecoilSnapshot, useGotoRecoilSnapshot} from 'recoil';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { todoListStatsState } from '../../AppState';

export const TodoListStats = () => {
  const {percentCompleted} =
    useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <div style={{ textAlign: "center" }}>
      {/* <TimeTravelObserver /> */}
      <div style={{ display: "flex", height: 100 }}>
      <CircularProgressbar value={formattedPercentCompleted} text={`${formattedPercentCompleted}%`} />
      </div>
    </div>
  
  );
};

function TimeTravelObserver() {
  const [snapshots, setSnapshots] = useState([]);

  const snapshot = useRecoilSnapshot();
  const release = snapshot.retain();
  useEffect(() => {
    if (snapshots.every((s: any) => s.getID() !== snapshot.getID())) {
      setSnapshots([...snapshots, snapshot] as any);
      release()
    }
  }, [snapshot]);

  const gotoSnapshot = useGotoRecoilSnapshot();

  const Button = styled.button`
    background-color: #b9a1a1;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
  `;

  return (
    <ul style={{ listStyle: "none" }}>
      {snapshots.map((snapshot, i) => (
        <li key={i}>
          <Button onClick={() => gotoSnapshot(snapshot)}>
            Restore {i} snapshot
          </Button>
        </li>
      ))}
    </ul>
  );
}