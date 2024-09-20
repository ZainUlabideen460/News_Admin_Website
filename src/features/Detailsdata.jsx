import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// For login
// export const createuser = createAsyncThunk(
//   'createuser',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await fetch('https://news-api-task2.vercel.app/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const result = await response.json();
//       return result;
//     } catch (e) {
//       return rejectWithValue(e.message);
//     }
//   }
// );
// For login
export const createuser = createAsyncThunk(
  'createuser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('https://news-api-task2.vercel.app/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      localStorage.setItem('token', result.token); // Store the token in local storage
      return result;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


// For add category
// export const addcatagoryfun = createAsyncThunk(
//   'addcategory',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await fetch('https://news-api-task2.vercel.app/categories/createcategory', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(data)
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const result = await response.json();
//       return result;
//     } catch (e) {
//       return rejectWithValue(e.message);
//     }
//   }
// );
// For add category
export const addcatagoryfun = createAsyncThunk(
  'addcategory',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      // console.log('Token:', token); // Log the token to ensure it is being retrieved correctly

      if (!token) {
        throw new Error('Token is missing');
      }

      const response = await fetch('https://news-api-task2.vercel.app/categories/createcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


// For read category data
export const readcategory = createAsyncThunk(
  'readcategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://news-api-task2.vercel.app/categories/getcategories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// for update category


export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing');
      }

      console.log('Data to be sent:', data);

      const response = await fetch(`https://news-api-task2.vercel.app/categories/updatecategory${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: data.name }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Server error:', errorResponse);
        throw new Error(errorResponse.message || 'Failed to update category');
      }

      const result = await response.json();
      return result;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


export const addnewsfun = createAsyncThunk(
  'addnewsfun',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      if (!token) {
        throw new Error('Token is missing');
      }

      // Log the FormData contents
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch('https://news-api-task2.vercel.app/news/createnews', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Server error:', errorResponse);
        throw new Error(JSON.stringify(errorResponse));
      }

      const result = await response.json();
      return result;
    } catch (e) {
      console.error('Error in addnewsfun:', e);
      return rejectWithValue(e.message);
    }
  }
);
///read news
export const readnews = createAsyncThunk(
  'readnews',
  async (id = null, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing');
      }
      const url =  'https://news-api-task2.vercel.app/news/getnews';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//delete news articles
export const deletenewsfun = createAsyncThunk("deletenewsfun", async (id, { rejectWithValue, getState }) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token is missing');
    }

    const response = await fetch(`https://news-api-task2.vercel.app/news/deletenews/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Server error:', responseText);
      throw new Error(`Server responded with status code ${response.status}: ${responseText}`);
    }

    const result = await response.json();
    return { id: result.id };
  } catch (e) {
    console.error('Error in deletecategoryfun:', e);
    return rejectWithValue(e.message);
  }
});



//delete category

export const deletecategoryfun = createAsyncThunk("deletecategory", async (id, { rejectWithValue, getState }) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token is missing');
    }

    const response = await fetch(`https://news-api-task2.vercel.app/categories/deletecategory${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Server error:', responseText);
      throw new Error(`Server responded with status code ${response.status}: ${responseText}`);
    }

    const result = await response.json();
    return { id: result.id };
  } catch (e) {
    console.error('Error in deletecategoryfun:', e);
    return rejectWithValue(e.message);
  }
});
// update news 
export const updatenews = createAsyncThunk('details/updatenews', async (newsData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://news-api-task2.vercel.app/news/updatenews/${newsData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newsData.title,
        content: newsData.content,
        categoryId: newsData.categoryId // Ensure all required fields are included
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || 'Failed to update news');
    }

    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message || 'An unexpected error occurred');
  }
});

/// read user

export const readUsers = createAsyncThunk('readUsers', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing');
    }

    const response = await fetch(`https://news-api-task2.vercel.app/news/admin/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to toggle user status');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// toggle user status
// export const  toggleUserStatus =createAsyncThunk('toggleUserStatus',async(id,{rejectWithValue})=>{
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Token is missing');
//     }
//     const response = await fetch(`https://news-api-task2.vercel.app/news/admin/users/${id}/toggle`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       }
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to toggle user status');
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

export const toggleUserStatus = createAsyncThunk(
  'toggleUserStatus',
  async (id, { rejectWithValue }) => {
      try {
          const token = localStorage.getItem('token');
          if (!token) {
              throw new Error('Token is missing');
          }
          const response = await fetch(`https://news-api-task2.vercel.app/news/admin/users/${id}/toggle`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Failed to toggle user status');
          }

          const result = await response.json();
          return result;
      } catch (error) {
          return rejectWithValue(error.message);
      }
  }
);

// read report
// In Detailsdata.js
export const readreport = createAsyncThunk(
  'readreport',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing');
      }
      const response = await fetch('https://news-api-task2.vercel.app/news/reports', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }   
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error("API Error Response:", errorData);
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      console.log("API Response:", result);
      return result;
    } catch (error) {
      console.error("Error in readreport:", error);
      return rejectWithValue(error.message);
    }
  }
);
// In the reducer part

export const detailsdata = createSlice({
  name: 'details',
  initialState: {
    users: [],
    categories: [],
    news: [],
    reports: [],
    value: 0,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createuser actions
      .addCase(createuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createuser.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload.id;
      })
      .addCase(createuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle addcatagoryfun actions
      .addCase(addcatagoryfun.pending, (state) => {
        state.loading = true;
      })
      .addCase(addcatagoryfun.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload); // Assuming you want to add the new category to categories
      })
      .addCase(addcatagoryfun.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle readcategory actions
      .addCase(readcategory.pending, (state) => {
        state.loading = true;
      })
      // .addCase(readcategory.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.categories = action.payload;
      // })
      .addCase(readcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.map(category => ({
          _id: category._id,
          name: category.name
        }))
      })
      .addCase(readcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /// add news 
      .addCase(addnewsfun.pending, (state) => {
        state.loading = true;
      })
      .addCase(addnewsfun.fulfilled, (state, action) => {
        state.loading = false;
        state.news.push(action.payload); // Assuming you want to add the new category to categories
      })
      .addCase(addnewsfun.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //read news
      .addCase(readnews.pending, (state) => {
        state.loading = true;
      })
      .addCase(readnews.fulfilled, (state, action) => {
        state.loading = false;
       state.news = action.payload.map(news => ({
         _id: news._id,
         title: news.title,
         content: news.content,
         categoryId: news.categoryId
       })
      )
      })
      .addCase(readnews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //delete news articles
      .addCase(deletenewsfun.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletenewsfun.fulfilled, (state, action) => {
        state.loading = false;
        state.news = state.news.filter((category) => category._id !== action.payload.id);
       
      })
      .addCase(deletenewsfun.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete category
      .addCase(deletecategoryfun.pending, (state) => {
        state.loading = true;
      })
     
      .addCase(deletecategoryfun.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((category) => category._id !== action.payload.id);
      })
      .addCase(deletecategoryfun.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update category

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((category) => 
          category._id === action.payload._id ? action.payload : category
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
//update news

.addCase(updatenews.pending, (state) => {
  state.loading = true;
})
.addCase(updatenews.fulfilled, (state, action) => {
  state.loading = false;
  state.news = state.news.map((category) => 
    category._id === action.payload._id ? action.payload : category
  );
})
.addCase(updatenews.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
  

  //read users
  .addCase(readUsers.pending, (state) => {
    state.loading = true;
  })
  .addCase(readUsers.fulfilled, (state, action) => {
    state.loading = false;
    state.users = action.payload;
  })
  .addCase(readUsers.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  // toggle user status
  .addCase(toggleUserStatus.pending, (state) => {
    state.loading = true;
  })
  .addCase(toggleUserStatus.fulfilled, (state, action) => {
    state.loading = false;
    state.users = state.users.map((user) => 
          user._id === action.payload._id ? {...user, isActive:!user.isActive } : user
        );
  })
  .addCase(toggleUserStatus.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  //read report
  .addCase(readreport.pending, (state) => {
    state.loading = true;
  })
  // .addCase(readcategory.fulfilled, (state, action) => {
  //   state.loading = false;
  //   state.categories = action.payload;
  // })
  .addCase(readreport.fulfilled, (state, action) => {
    state.loading = false;
    console.log("Action payload:", action.payload);
  
    if (Array.isArray(action.payload)) {
      // If the payload is an array of reports
      state.reports = action.payload.map(report => ({
        ...report,
        username: report.username || report.user?.username
      }));
    } else if (action.payload && typeof action.payload === 'object') {
      // If the payload is a single news item
      const { _id, title, content, reports, users } = action.payload;
      state.reports = (reports || []).map(report => ({
        ...report,
        newsId: _id,
        newsTitle: title,
        newsContent: content,
        name: report.name || report.users?.name || users?.name
      
      }));
      console.log(reports.name);
    } else {
      console.error("Unexpected payload format:", action.payload);
      state.reports = [];
    }
  })
  .addCase(readreport.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
 },

});

export default detailsdata.reducer;
