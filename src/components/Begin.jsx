function Begin() {
  return (
    <>
      <h1>Begin Analyzing</h1>
      <form>
        <label for="iracing-number">
          Enter your iRacing Membership Number:
        </label>
        <input
          type="text"
          id="iracing-number"
          name="iracing-number"
          placeholder="000000"
        />
      </form>
    </>
  );
}

export default Begin;
