const PrescriptionQueries = {
    getPrescription: "SELECT * FROM prescriptions  WHERE id = $1",
    getPrescriptions: "SELECT * FROM prescriptions  WHERE user_id = $1",
    getPrescriptionsEndDate: "SELECT * FROM prescriptions  WHERE prescription_end_date = $1",
    updatePrescription: "UPDATE prescriptions SET drug_name= $1 ,dose=$2 ,unit=$3,end_date=$4, first_timer=$5,second_timer=$6,third_timer=$7, status=$8 WHERE id=$9  RETURNING *",
    createPrescription: "INSERT INTO prescriptions (user_id,drug_name,dose,unit,end_date,first_timer,second_timer,third_timer,status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    deletePrescription: "DELETE FROM prescriptions  WHERE id = $1",
    getFirstTimers:"SELECT email FROM prescriptions INNER JOIN users ON users.id = prescriptions.user_id WHERE prescriptions.status = 'active' AND first_timer =$1",
    getSecondTimers:"SELECT email FROM prescriptions INNER JOIN users ON users.id = prescriptions.user_id WHERE prescriptions.status = 'active' AND second_timer =$1",
    getThirdTimers:"SELECT email FROM prescriptions INNER JOIN users ON users.id = prescriptions.user_id WHERE prescriptions.status = 'active' AND third_timer =$1",
    updatePrescriptionStatus: "UPDATE prescriptions SET status= 'ended' WHERE  $1 >= end_date  RETURNING * ",
};

export default PrescriptionQueries;
