import React from 'react';

const HotelBenefits = props => {
  return (
    <div className="row">
      <div className="col-sm-3">
        <label className="form-label form-control-sm">Преимущества:</label>
      </div>
      <div className="col-sm-9">
        {/* <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalEditBenefits" onClick={() => assignmentBenefitsToNewArray()}>
          Редактировать
        </button> */}
        <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#modalEditBenefits">
          Редактировать
        </button>
      </div>
    </div>
  );
};

export default HotelBenefits;
