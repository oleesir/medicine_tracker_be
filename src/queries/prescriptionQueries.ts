const PrescriptionQueries = {
    getPrescription: "SELECT * FROM prescriptions  WHERE id = $1",
    getPrescriptions: "SELECT * FROM prescriptions  WHERE user_id = $1",
    updatePrescription: "UPDATE prescriptions SET drug_name= $1 ,dose=$2 ,unit=$3 ,drug_form=$4, with_food=$5 ,take_for=$6  WHERE id=$7  RETURNING *",
    createPrescription: "INSERT INTO prescriptions (user_id,drug_name,dose,unit,drug_form,with_food,take_for) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *"
};

export default PrescriptionQueries;
