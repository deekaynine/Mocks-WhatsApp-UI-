import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { SearchContainer, SearchInput } from "./ContactList";
import { messagesList } from "../mockData";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 3;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 10px;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const ChatBox = styled.div`
  display: flex;
  background: #f0f0f0;
  padding: 10px;
  align-items: center;
  bottom: 0;
`;

const Emoji = styled.img`
  width: 28px;
  height: 28px;
  opacity: 0.4;
  cursor: pointer;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #e6ddd6;
  overflow-y: auto;
`;

const MessageDiv = styled.div`
  justify-content: ${(props) => (props.isYours ? "flex-end" : "flex-start")};
  display: flex;
  margin: 5px 15px;
`;

const Message = styled.div`
  background: ${(props) => (props.isYours ? "#daf8cb" : "white")};
  max-width: 50%;
  color: #303030;
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 4px;
`;

const ChatContainer = (props) => {
  const { selectedChat } = props;
  const [text, setText] = useState("");
  const [emojiToggle, setEmojiToggle] = useState(false);
  const [messageList, setMessageList] = useState(messagesList);

  const onEmojiClick = (e, emojiObj) => {
    setText(text + emojiObj.emoji);
    setEmojiToggle(false);
  };

  const onEnter = (e) => {
    if (e.key == "Enter") {
      const messages = [...messageList];
      messages.push({
        id: 0,
        messageType: "TEXT",
        text,
        senderID: 0,
        addedOn: "3:00 PM",
      });
      setMessageList(messages);
      setText("");
    }
  };

  return (
    <Container>
      <ProfileHeader>
        <ProfileImage src={selectedChat.profilePic} />
        {selectedChat.name}
      </ProfileHeader>
      <MessageContainer>
        {messageList.map((messageData) => (
          <MessageDiv isYours={messageData.senderID === 0}>
            <Message isYours={messageData.senderID === 0}>
              {messageData.text}
            </Message>
          </MessageDiv>
        ))}
      </MessageContainer>
      <ChatBox>
        <SearchContainer>
          {emojiToggle && (
            <Picker
              pickerStyle={{ position: "absolute", bottom: "60px" }}
              onEmojiClick={onEmojiClick}
            />
          )}
          <Emoji
            src={"/data.svg"}
            onClick={() => setEmojiToggle(!emojiToggle)}
          />
          <SearchInput
            placeholder="Type a message..."
            value={text}
            onKeyDown={onEnter}
            onChange={(e) => setText(e.target.value)}
          />
        </SearchContainer>
      </ChatBox>
    </Container>
  );
};

export default ChatContainer;
