const CategoryForm = ({
  handleSubmit,
  value,
  setValue,
  edit,
  handleDelete,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control p-3"
        placeholder="name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        {!edit ? "Submit" : "Update"}
      </button>

      {edit && handleDelete && (
        <button
          type="button"
          className="btn btn-outline-danger m-3"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </form>
  );
};

export default CategoryForm;
