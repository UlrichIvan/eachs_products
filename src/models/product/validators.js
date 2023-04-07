const mongoose = require("mongoose");
// const userServices = require("../../services/userServices");
const roles = require("../roles");
const RawMaterialsValidator = function (ids = []) {
  if (!ids.length) return false;
  let errors = ids.filter((id) => !mongoose.Types.ObjectId.isValid(id));
  if (errors.length === 0) return true;
  else throw new Error("invalid raw materials!!!");
};

const creatorValidator = async function (id_creator = null) {
  let { validate } = await creatorValidation(id_creator, this);
  return validate;
};
const creatorValidation = async (id_creator = null, context = null) => {
  if (!id_creator) {
    console.log({ id_creator: "invalid" });
    if (context) {
      throw new Error(
        "you have not authorization to do the current action,please see your administrator to perform it!!!"
      );
    } else {
      return { creator: null, validate: false };
    }
  }
  console.log({ id_creator });
  // get creator
  // let creator = await userServices.findUser({
  //   _id: id_creator,
  // });
  console.log("###########################");
  // console.log({ creator: creator?._id });
  console.log("###########################");

  // if creator not exists
  if (!creator) {
    throw new Error(
      "you have not authorization to do the current action,please see your administrator to perform it!!!"
    );
  }
  // creator has authorization to do current action (delete,update,create)
  if ([roles.SUPER_ADMIN, roles.MANAGER].includes(creator.role)) {
    if (context) context._creator = creator;
    return { creator, validate: true };
  } else {
    throw new Error(
      "you have not authorization to do the current action,please see your administrator to perform it!!!"
    );
  }
};

const fieldsValidator = (fields = [], fieldsaRequired = []) => {
  let invalidFields = fields.filter(
    (field) => !fieldsaRequired.includes(field)
  );

  return { validate: invalidFields.length === 0 ? true : false };
};
module.exports = {
  RawMaterialsValidator,
  creatorValidator,
  creatorValidation,
  fieldsValidator,
};
