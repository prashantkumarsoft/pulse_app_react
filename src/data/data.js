export default  {
    "lead_stage_count": 0,
    "qualified_stage_count": 1,
    "booked_stage_count": 1,
    "treated_stage_count": 0,
    "data": [
        {
            "id": 1,
            "procedure_name": "patient2",
            "stage_history": [
                {
                    "timestamp": "DEC 4",
                    "stage_name": "lead"
                },
                {
                    "timestamp": "2024-01-31T07:49:26.302Z",
                    "stage_name": "qualified"
                }
            ],
            "current_stage": null,
            "patient": {
                "id": 4,
                "full_name": "patient2 sharma",
                "gender": "male",
                "age": 25,
                "avatar_url": null
            },
            "doctor": {
                "id": 1,
                "full_name": "jhon sharma",
                "avatar_url": null
            }
        },
        {
            "id": 2,
            "procedure_name": "abc",
            "stage_history": [
                {
                    "timestamp": "Dec 4, 2023 4:35PM",
                    "stage_name": "Qualified"
                },
                {
                    "timestamp": "2024-01-30T18:31:07.054Z",
                    "stage_name": "Booked"
                }
            ],
            "current_stage": "booked",
            "patient": {
                "id": 3,
                "full_name": "patient1 sharma",
                "gender": "male",
                "age": 25,
                "avatar_url": null
            },
            "doctor": {
                "id": 6,
                "full_name": "jhon sharma",
                "avatar_url": "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--62acd6f1e7933ff03cacdfecb9e0fd208a37cc07/Screenshot%20from%202024-01-30%2015-39-16.png"
            }
        },
        {
            "id": 3,
            "procedure_name": "abcd",
            "stage_history": [
                {
                    "timestamp": "DEC 4",
                    "stage_name": "lead"
                },
                {
                    "timestamp": "2024-01-31T07:49:26.302Z",
                    "stage_name": "qualified"
                }
            ],
            "current_stage": "qualified",
            "patient": {
                "id": 1,
                "full_name": "jhon sharma",
                "gender": "male",
                "age": 25,
                "avatar_url": null
            },
            "doctor": {
                "id": 6,
                "full_name": "jhon sharma",
                "avatar_url": "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--62acd6f1e7933ff03cacdfecb9e0fd208a37cc07/Screenshot%20from%202024-01-30%2015-39-16.png"
            }
        }
    ]
}