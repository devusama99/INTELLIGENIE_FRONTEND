function DotColored(props) {
  return (
    <div
      style={{
        width: props.size + "px",
        height: props.size + "px",
        backgroundColor: props.color,
        borderRadius: "50%",
        marginLeft: "20px",
      }}
    />
  );
}

export default DotColored;
