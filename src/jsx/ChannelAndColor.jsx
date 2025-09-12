function ChannelAndColor({ channel, color }) {
  return (
    <>
      <div className="channel-and-color" style={{ backgroundColor: color }}>
        {channel}
      </div>
    </>
  );
}
export default ChannelAndColor;
