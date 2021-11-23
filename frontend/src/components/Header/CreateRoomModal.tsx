import { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Socket } from 'socket.io-client';

import '../../stylesheets/header.scss';
import { Room } from '../../types';

function CreateRoomModal ({ history, socket, onCancel }: { history: RouteComponentProps['history'], socket: Socket, onCancel: any }) {
  const [nextRoomIndex, setNextRoomIndex] = useState(1);
  const [dialogInput, setDialogInput] = useState<Room>({
    id: nextRoomIndex,
    name: '',
    description: '',
  });
  
  function changeDialogRoomName(e: React.BaseSyntheticEvent) {
    setDialogInput({
      ...dialogInput,
      name: e.target.value,
    });
  }

  function changeDialogRoomDescription(e: React.BaseSyntheticEvent) {
    setDialogInput({
      ...dialogInput,
      description: e.target.value,
    });
  }

  function createRoom() {
    if (
      dialogInput.name.split('').every(val => val === ' ') ||
      dialogInput.description.split('').every(val => val === ' ')
    ) {
      alert('공백만 입력할 수 없습니다. 다시 입력해주세요');
      return;
    }

    if (dialogInput.name && dialogInput.description) {
      socket.emit('createRoom', {
        id: nextRoomIndex,
        name: dialogInput.name,
        description: dialogInput.description,
      });
      setNextRoomIndex(nextRoomIndex + 1);

      history.push(`/room/${dialogInput.name}`);
    } else {
      alert('입력칸을 다 채워주세요');
    }
  }
  return (
      // <div className="dark-background">
        <div className="dialog">
          <p>방 생성</p>
          <form className="input-wrap" action="submit">
            <label htmlFor="room-id">방 제목</label>
            <input type="text" id="room-id" placeholder="방 제목" onChange={changeDialogRoomName} />
            <label htmlFor="room-detail">방 설명</label>
            <textarea
              name="text1"
              cols={40}
              rows={5}
              className="input-description"
              id="room-detail"
              placeholder="방 설명"
              onChange={changeDialogRoomDescription}
            />
          </form>
          <div className="button-wrap">
            <button className="button" onClick={createRoom}>
              생성
            </button>
            <button className="button" onClick={onCancel}>
              취소
            </button>
          </div>
        </div>
      // </div>
  )
}

function CreateRoomButton () {
  return (
    <div className="modalContainer">
      <button className="header-button">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M14 6v15H3v-2h2V3h9v1h5v15h2v2h-4V6h-3zm-4 5v2h2v-2h-2z"/></svg>
        <p>방 생성하기</p>
      </button>
      {/* <CreateRoomModal /> */}
    </div>
  )
}

export default CreateRoomButton;