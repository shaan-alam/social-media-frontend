const Icon = ({ src }: { src: string }) => {
  return (
    <img
      src={src}
      alt="Placeholder Icon"
      style={{
        filter:
          "invert(59%) sepia(11%) saturate(200%) saturate(135%) hue-rotate(176deg) brightness(96%) contrast(94%)",
      }}
    />
  );
};


export default Icon;