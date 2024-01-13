

const SectionTitle = ({subTitle,title}) => {
    return (
      <div className="mx-auto text-center md:w-4/12 my-8">
        <p className="mb-2 text-cyan-600">{subTitle}</p>
        <div className="divider divider-info"></div>
        <h3 className="text-3xl uppercase">{title}</h3>
        <div className="divider divider-info"></div>
      </div>
    );
};

export default SectionTitle;