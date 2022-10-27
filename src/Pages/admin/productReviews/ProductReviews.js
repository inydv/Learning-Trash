import React, { useState, useEffect } from 'react'
import './ProductReviews.css';
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { ALL_REVIEW, DELETE_REVIEW } from "../../../redux/product/reviewApiCall";
import { CLEAR_ERRORS } from "../../../redux/product/reviewRedux";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate } from 'react-router-dom';
import Loading from "../../../Components/loading/Loading";

export default function ProductReviews() {
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const { error, allReview: reviews, isFetching, deleteReview } = useSelector((state) => state.review);

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(DELETE_REVIEW(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(ALL_REVIEW(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(ALL_REVIEW(productId));
    }
    if (error) {
      dispatch(CLEAR_ERRORS());
    }

    if (deleteReview) {
      Navigate("/admin/reviews");
      // dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteReview, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 250, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "action",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="productReviewsContainer">
        <form
          className="productReviewsForm"
          onSubmit={productReviewsSubmitHandler}
        >
          <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

          <div>
            <Star />
            <input
              type="text"
              placeholder="Product Id"
              required
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={
              isFetching ? true : false || productId === "" ? true : false
            }
          >
            Search
          </Button>
        </form>

        {reviews && reviews.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
            density="compact" // for making compact table
            sx={{ // for borders
              '.MuiDataGrid-columnSeparator': {
                display: 'none',
                border: 'none'
              },
              '.MuiDataGrid-rowSeparator': {
                display: 'none',
                border: 'none'
              },
              '&.MuiDataGrid-root': {
                border: 'none',
              },
              '.MuiDataGrid-cell': {
                border: 'none'
              },
            }}
          />
        ) : (
          <h1 className="productReviewsFormHeading">No Reviews Found</h1>
        )}
      </div>
    </div>
  )
}
