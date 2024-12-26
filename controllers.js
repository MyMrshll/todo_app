const fs = require("fs-extra");

const getDataLocal = async () => {
  const fileBuffer = await fs.readFile("./public/task.json");
  const data = JSON.parse(fileBuffer);
  return data;
};

const getData = async (req, res) => {
  const data = await getDataLocal();
  if(data.length === 0) {
    return res.status(404).json({ message: "Data not found" });
  }
  res.staus(200).json(data);
};

const addData = async (req, res) => {
  const payload = req.body;
  const datas = await getDataLocal();
  const newData = { id: datas.length + 1, ...payload };
  datas.push(newData);
  await fs.writeFile("./public/task.json", JSON.stringify(datas));
  res.json({
    message: "Data added successfully",
    data: datas,
  });
};

const deleteData = async (req, res) => {
    const id = req.params.id;
    const datas = await getDataLocal();
    const newData = datas.filter((data) => data.id != id);
    await fs.writeFile("./public/task.json", JSON.stringify(newData));
    res.json({
        message: "Data deleted successfully",
        data: newData,
    });
}

const updateData = async (req, res) => {
    const id = req.params.id;
    const datas = await getDataLocal();
    const newData = datas.map((data) => {
        if(data.id == id) {
            data.completed = true;
        }
        return data;
    })
    await fs.writeFile("./public/task.json", JSON.stringify(newData));
    res.json({
        message: "Data updated successfully",
        data: newData,
    });
};

module.exports = {
  getData,
  addData,
  deleteData,
  updateData
};
